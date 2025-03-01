module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-nunito)", // 優先使用 Nunito
          "var(--font-noto-tc)", // 當遇到中文字符時會自動降級到 Noto Sans TC
          "sans-serif", // 最後的後備字體
        ],
      },
    },
  },
};
