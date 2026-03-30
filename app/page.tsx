"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Image as ImageIcon, Download, Loader2, ChevronRight } from "lucide-react";

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setResultImage(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleRemoveBg = useCallback(async () => {
    if (!originalImage) return;
    setIsProcessing(true);

    // Simulate API call - in production, call your backend or Remove.bg API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setResultImage(originalImage); // For demo, just show original
    setIsProcessing(false);
  }, [originalImage]);

  const handleDownload = useCallback(() => {
    if (!resultImage) return;
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = "removed-background.png";
    link.click();
  }, [resultImage]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Image Background Remover</h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer ${
              isDragging
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              拖拽图片到这里，或点击选择文件
            </p>
            <p className="text-sm text-gray-500">支持 JPG、PNG、WebP 等格式</p>
          </div>

          {/* Preview */}
          {(originalImage || resultImage) && (
            <div className="mt-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex-1">
                  <p className="text-center text-sm font-medium text-gray-500 mb-3">原图</p>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {originalImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={originalImage}
                        alt="Original"
                        className="w-full max-h-96 object-contain"
                      />
                    )}
                  </div>
                </div>

                <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />

                <div className="flex-1">
                  <p className="text-center text-sm font-medium text-gray-500 mb-3">去除背景后</p>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {isProcessing ? (
                      <div className="h-96 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                      </div>
                    ) : resultImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={resultImage}
                        alt="Result"
                        className="w-full max-h-96 object-contain"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Crect fill=\'%23ddd\' width=\'100\' height=\'100\'/%3E%3Crect fill=\'%23fff\' x=\'0\' y=\'0\' width=\'50\' height=\'50\'/%3E%3Crect fill=\'%23fff\' x=\'50\' y=\'50\' width=\'50\' height=\'50\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}
                      />
                    ) : (
                      <div className="h-96 flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-center">
                {!resultImage && !isProcessing && (
                  <button
                    onClick={handleRemoveBg}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <ImageIcon className="w-5 h-5" />
                    去除背景
                  </button>
                )}
                {resultImage && (
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    下载图片
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-6">
        Powered by AI · Built with Next.js
      </footer>
    </div>
  );
}