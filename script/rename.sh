#!/bin/bash

# 定义颜色代码
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
NC="\033[0m" # 无颜色

# info 函数，输出绿色文本
info() {
    echo -e "${GREEN}[INFO] $1${NC}"
}

# warn 函数，输出黄色文本
warn() {
    echo -e "${YELLOW}[WARN] $1${NC}"
}

# error 函数，输出红色文本并退出
error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# 检查是否提供了目录名
if [ $# -ne 1 ]; then
    info "用法: $0 <markdown-directory>"
    exit 1
fi

MARKDOWN_DIR="$1"

# 检查目录是否存在
if [ ! -d "$MARKDOWN_DIR" ]; then
    error "目录不存在: $MARKDOWN_DIR"
fi

# 确定 MD5 命令
if command -v md5sum &> /dev/null; then
    MD5_CMD="md5sum"
elif command -v md5 &> /dev/null; then
    MD5_CMD="md5"
else
    error "未找到适用的 MD5 命令 (md5sum 或 md5)。"
fi

# 遍历目录中的所有 Markdown 文件，跳过 README.md
find "$MARKDOWN_DIR" -type f -name "*.md" ! -name "README.md" | while read -r MARKDOWN_FILE; do
    # 检查文件是否存在
    if [ ! -f "$MARKDOWN_FILE" ]; then
        warn "未找到 Markdown 文件: $MARKDOWN_FILE"
        continue
    fi

    # 提取 front-matter 中的 title
    TITLE=$(sed -n '/^---/,/^---/p' "$MARKDOWN_FILE" | sed -n 's/^title: //p' | tr -d '\n')

    # 检查是否成功提取到标题
    if [ -z "$TITLE" ]; then
        warn "未找到标题: $MARKDOWN_FILE"
        continue
    fi

    # 生成 8 位唯一码（取标题的 MD5 哈希值并截取前 8 位）
    UNIQUE_CODE=$(echo -n "$TITLE" | $MD5_CMD | cut -c1-8)

    # 重命名文件，保持原目录结构
    DIR=$(dirname "$MARKDOWN_FILE")
    NEW_FILENAME="${DIR}/${UNIQUE_CODE}.md"
    
    # 检查新文件名是否已存在
    if [ -e "$NEW_FILENAME" ]; then
        if [ "$MARKDOWN_FILE" -ef "$NEW_FILENAME" ]; then
            # 如果是同一个文件，跳过
            echo "文件已存在且相同,跳过重命名: $MARKDOWN_FILE"
            continue
        else
            # 如果不是同一个文件，删除原来的文件
            rm "$NEW_FILENAME"
            mv "$MARKDOWN_FILE" "$NEW_FILENAME"
            info "已重命名并替换: $MARKDOWN_FILE -> $NEW_FILENAME"
        fi
    else
        mv "$MARKDOWN_FILE" "$NEW_FILENAME"
        info "文件已重命名: $MARKDOWN_FILE -> $NEW_FILENAME"
    fi
done
