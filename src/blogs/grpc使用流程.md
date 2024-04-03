---
title: grpc使用流程
category: [Go]
tag: [grpc]
date: 2023-05-13 14:39:27
---

## proto文件

在项目根目录下，创建`pb_file/agent.proto`文件。

```protobuf
syntax = "proto3";

option go_package = ".;pb_file";
//  agent/pb_file 两部分，第一部分生成的代码路径，第二部分是所属的包名
//  格式也可以是 agent;pb_file
package pb_file;

service AgentService {
   rpc Ping (PingInfo) returns (PingResponse);
}

message PingInfo {
   string User = 1;
}

message PingResponse {
   bool Success = 1;
}

//  在 gRPC 的 Protocol Buffers（protobuf）定义文件（.proto 文件）中，
// 数字标识符（tag）用于标识字段的唯一标识符。它们是非负整数，可以在字段定义中指定。
// 通常情况下，我们会从 1 开始为字段分配数字标识符，并按照定义顺序逐个递增。
// 这样做的好处是，可以使消息的结构更加清晰，易于维护和扩展。
// 在将来，如果需要向消息中添加新的字段，可以向现有定义的字段之间插入新的字段，而不必破坏现有的客户端和服务器代码。
```

## 编译go代码

### 安装工具

```shell
go get -u google.golang.org/grpc
go get -u github.com/golang/protobuf/protoc-gen-go
```

在项目根目录下，执行命令，生成对应的go代码

```shell
protoc --proto_path=pb_file pb_file/agent.proto --go-grpc_out=./pb_file --go_out=./pb_file
```

此时项目结构为：

```shell
🕙[ 08:58:32 ] ➜  tree .
.
|-- README.md
|-- go.mod
|-- go.sum
|-- main.go
`-- pb_file
    |-- agent.pb.go
    |-- agent.proto
    `-- agent_grpc.pb.go

1 directory, 7 files
```

此时，就可以在main.go中编写grpc服务端和客户端代码。

> 服务端和客户端是两个不同的项目，不能写在一起。

### 服务端代码

```go
package main

import (
	"context"
	"net"
	"os/user"

	pb "github.com/bookandmusic/agent/pb_file"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
	"google.golang.org/grpc/peer"
)

type server struct {
	pb.UnimplementedAgentServiceServer
}

func logPeer(ctx context.Context, funcName string) error {
	pr, ok := peer.FromContext(ctx)
	if !ok {
		log.Error("Ping 获取连接信息失败")
		return &net.AddrError{Err: "unknown peer"}
	}
	log.Info(funcName, " 从:", pr.Addr.String())
	return nil
}

func (s *server) Ping(ctx context.Context, in *pb.PingInfo) (*pb.PingResponse, error) {
	if logPeer(ctx, "Ping") != nil {
		return &pb.PingResponse{Success: false}, nil
	}
	u, err := user.Current()
	if err != nil {
		log.Error("获取当前用户出错:", err.Error())
		return &pb.PingResponse{Success: false}, nil
	}
	if u.Username != in.User {
		log.Error("用户Ping出错:", in.User)
		return &pb.PingResponse{Success: false}, nil
	}
	return &pb.PingResponse{Success: true}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterAgentServiceServer(s, &server{})
	log.Printf("Server started at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
```

### 客户端代码

```go
package main

import (
	"context"

	pb "github.com/bookandmusic/agent/pb_file"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

func main() {
	address := "localhost:50051"
	// 连接gRPC服务端
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("not connect: %v", err)
	}
	defer conn.Close()

	// 创建AgentService客户端
	c := pb.NewAgentServiceClient(conn)

	// 构建请求
	req := &pb.PingInfo{User: "liusf"}

	// 发送请求并接收响应
	resp, err := c.Ping(context.Background(), req)
	if err != nil {
		log.Fatalf("could not ping: %v", err)
	}
	log.Printf("Ping status: %v", resp.Success)
}

```

当服务端运行时，客户端就可以根据服务端地址，测试是否联通。

## 编译python代码

### 安装工具

```shell
pip install grpcio grpcio-tools protobuf
```

在项目根目录下，执行命令，生成对应的go代码

```shell
# --python_out= 输出目录
# --proto_path= 或 -I  proto文件路径
python -m grpc_tools.protoc -I=pb_file --python_out=./pb_file --pyi_out=./pb_file --grpc_python_out=./pb_file pb_file/agent.proto
```

此时项目结构为：

```shell
🕙[ 09:18:50 ] ➜  tree .      
.
|-- __init__.py
|-- client.py
|-- pb_file
|   |-- __init__.py
|   |-- agent.proto
|   |-- agent_pb2.py
|   |-- agent_pb2.pyi
|   `-- agent_pb2_grpc.py
`-- server.py

1 directory, 8 files
```

>**Note**
>
>- agent_pb2.py: 实际使用的模块文件，针对快速加载进行了优化，不可读
>- agent_pb2.pyi: 描述原型接口的存根文件，对于IDE 或想要读取输出文件的用户非常有用
>
>仅当将 `--pyi_out=` 选项传递给 `protoc` 时，才会生成 `pyi` 文件。

此时，可以在`client.py`和 `server.py`中编写客户端和服务端代码。

### 服务端代码

```python
import asyncio
import getpass
import logging
from urllib.parse import unquote

import grpc

from pb_file import agent_pb2, agent_pb2_grpc


class AgentServicer(agent_pb2_grpc.AgentServiceServicer):
    def __init__(self, logger):
        self.logger = logger

    def logPeer(self, func: str, context: grpc.ServicerContext) -> None:
        address = context.peer()
        self.logger.info(f"{func} 从:{unquote(address)}")

    async def Ping(
        self, request: agent_pb2.PingInfo, context: grpc.ServicerContext
    ) -> agent_pb2.PingResponse:
        self.logPeer("Ping", context)

        try:
            current_user = getpass.getuser()  # 获取当前登录用户的用户名
        except Exception as e:
            self.logger.error(f"获取当前用户出错: {str(e)}")

        if request.User != current_user:
            is_valid = False
            self.logger.error(f"用户Ping出错:{request.User}")
        else:
            is_valid = True
        return agent_pb2.PingResponse(Success=is_valid)


async def main() -> None:
    # 输出服务端启动信息
    logger = logging.getLogger("server")
    # 设置日志格式和级别
    logging.basicConfig(
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        level=logging.DEBUG,
    )

    # 创建 gRPC 服务器，并将 AgentServicer 注册到服务器中
    server = grpc.aio.server()
    agent_pb2_grpc.add_AgentServiceServicer_to_server(
        AgentServicer(logger=logger), server
    )
    server.add_insecure_port("0.0.0.0:50051")
    # 启动服务器
    logger.info("Server started at :50051")

    await server.start()
    await server.wait_for_termination()


if __name__ == "__main__":
    asyncio.run(main())

```

### 客户端代码

```python
import asyncio

import grpc

from pb_file import agent_pb2, agent_pb2_grpc


async def grpc_ping(host: str, port: int, user: str, timeout: float = 1.0) -> bool:
    try:
        async with grpc.aio.insecure_channel(f"{host}:{port}") as channel:
            stub = agent_pb2_grpc.AgentServiceStub(channel)
            response = await stub.Ping(agent_pb2.PingInfo(User=user), timeout=timeout)
            return response.Success
    except grpc.aio.AioRpcError:
        return False


async def main():
    resp = await grpc_ping("localhost", 50051, "liusf")
    print(resp)


if __name__ == "__main__":
    asyncio.run(main())

```

> 当然，`rpc`协议允许不同代码之间通信，也就是说，可以python服务端和go客户端，或go服务端和python客户端，进行通信。

