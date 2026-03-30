# image-background-remover

AI-powered image background removal tool using Python.

## 安装

```bash
pip install -r requirements.txt
```

## 使用方法

```bash
# 移除单张图片背景
python remove_bg.py input.jpg output.png

# 批量处理
python batch_remove.py ./input_folder ./output_folder

# CLI 工具
python main.py input.jpg -o output.png
```

## API 使用

```python
from background_remover import remove_background

# 从文件
remove_background("input.jpg", "output.png")

# 从 PIL Image
from PIL import Image
from background_remover import remove_background_from_image
img = Image.open("input.jpg")
result = remove_background_from_image(img)
result.save("output.png")
```

## 依赖

- `rembg` - AI 背景移除
- `Pillow` - 图片处理
- `onnxruntime` - 推理引擎

## License

MIT