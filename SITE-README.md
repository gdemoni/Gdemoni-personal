# Digital Garden — first draft

一个使用 React + Vite 的个人数字花园初版。

## 预览

在本目录安装依赖并启动预览：

```powershell
npm install
npm run dev -- --port 4173
```

然后打开 `http://localhost:4173/`。

## 替换内容

- 在 `index.html` 中替换邮箱和 GitHub 链接。
- 在 `projects.js` 中替换四个示例项目；项目详情页会自动读取同一份数据。
- 在 `app.js` 的 `dictionary` 中替换中英文简介与履历。
- 已接入 React Bits 风格的 `VariableProximity` 大标题与 `Dock` 花园导航，组件位于 `src/components/`。
- 后续动画组件仍可挂接在 `.enter-garden`、`.project-card`、`.gardener-scene` 和 `.reveal` 上，不需要改变页面结构。
