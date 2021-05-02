// 我們創建一個代理，來幫我們判斷
// 如果用戶連結到 "/api", "/auth/google" 時
// 這個 proxy 會幫我們導向 http://localhost:5000 網域
// 而這個代理也只存在於 Dev 模式，在我們的 Prod 模式下
// 這些都將被編譯成 public 資料夾的一部分
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
// 若在沒有使用 Proxy 的情況下，以本章節的例子
// 以 3000 Port 想要對 5000 Port 提出請求
// 那這個 request 將不會自動帶入 Cookie
// 這只是個單純的安全問題