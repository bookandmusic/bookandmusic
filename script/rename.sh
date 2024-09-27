#!/bin/bash

# 检查是否提供了目录名
if [ $# -ne 1 ]; then
    echo "用法: $0 <markdown-directory>"
    exit 1
fi

MARKDOWN_DIR="$1"

# 检查目录是否存在
if [ ! -d "$MARKDOWN_DIR" ]; then
    echo "目录不存在: $MARKDOWN_DIR"
    exit 1
fi

# 确定 MD5 命令
if command -v md5sum &> /dev/null; then
    MD5_CMD="md5sum"
    CUT_CMD="cut -c1-8"
elif command -v md5 &> /dev/null; then
    MD5_CMD="md5"
    CUT_CMD="awk '{print substr(\$1, 1, 8)}'"
else
    echo "未找到适用的 MD5 命令 (md5sum 或 md5)。"
    exit 1
fi

# 遍历目录中的所有 Markdown 文件，跳过 README.md
find "$MARKDOWN_DIR" -type f -name "*.md" ! -name "README.md" | while read -r MARKDOWN_FILE; do
    # 检查文件是否存在
    if [ ! -f "$MARKDOWN_FILE" ]; then
        echo "未找到 Markdown 文件: $MARKDOWN_FILE"
        continue
    fi

    # 提取 front-matter 中的 title
    TITLE=$(sed -n '/^---/,/^---/p' "$MARKDOWN_FILE" | sed -n 's/^title: //p' | tr -d '\n')

    # 检查是否成功提取到标题
    if [ -z "$TITLE" ]; then
        echo "未找到标题: $MARKDOWN_FILE"
        continue
    fi

    # 生成 8 位唯一码（取标题的 MD5 哈希值并截取前 8 位）
    UNIQUE_CODE=$(echo -n "$TITLE" | $MD5_CMD | cut -c1-8)

     # 重命名文件，保持原目录结构
    DIR=$(dirname "$MARKDOWN_FILE")
    NEW_FILENAME="${DIR}/${UNIQUE_CODE}.md"
    
    # 检查新文件名是否已存在
    if [ -e "$NEW_FILENAME" ]; then
        echo "文件已存在: ${NEW_FILENAME}, 跳过重命名: ${MARKDOWN_FILE}"
        continue
    fi

    mv "$MARKDOWN_FILE" "$NEW_FILENAME"
    echo "文件已重命名: $MARKDOWN_FILE -> $NEW_FILENAME"
done
