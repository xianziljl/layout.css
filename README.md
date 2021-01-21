# Layout.css

## 开发
```bash
npm run dev
```
## 构建压缩版
```bash
npm run build
```
## flex 布局
```html
<div class="fr ac"> <!-- display: flex; flex-direction: row;align-items: center; -->
  <div class="f-1"></div> <!-- flex: 1 -->
  <div class="f-2"></div>
</div>
```

## grid 布局
```html
<div class="dgf gr-2 gc-2 gg-10">
  <div class="cs-2 rs-1"></div>
  <div></div>
  <div></div>
</div>
```
## margin
```html
<div class="m-10"></div> <!-- margin: 10px; -->
<div class="mx-10"></div> <!-- margin: 0 10px; -->
<div class="my-10"></div> <!-- margin: 10px 0; -->
<div class="mt-10"></div> <!-- margin-top: 10px; -->
<div class="mr-10"></div> <!-- margin-right: 10px; -->
<div class="mb-10"></div> <!-- margin-bottom: 10px; -->
<div class="ml-10"></div> <!-- margin-left: 10px; -->
```

## padding
规则与 `margin` 相同，例如
```html
<div class="p-10"></div> <!-- padding: 10px; -->
```

## font-size, line-height
```html
<p class="fs-14"></p> <!-- font-size: 14px; -->
<p class="lh-12"></p> <!-- line-height: 1.2em; -->
```

## z-index, opacity, border-radius
```html
<div class="z-5"></div> <!-- z-index: 5; -->
<div class="o-5"></div> <!-- opacity: 0.5; -->
<div class="r-5"></div> <!-- border-radius: 5px; -->
```
> 所有可选数值均可在 `scss/variable.scss` 中调整。  
> 例如 `margin` 的可选值为 `$margin` 变量，有 `1, 2, 3, 4, 5, 7, 10, 15, 20, 25, 30, 40, 50, 0`。

## border
```html
<div class="bd"></div> <!-- 四周边框 -->
<div class="bx"></div> <!-- 左右 -->
<div class="by"></div> <!-- 上下 -->
<div class="bt"></div> <!-- 上 -->
<div class="br"></div> <!-- 右 -->
<div class="bb"></div> <!-- 下 -->
<div class="bl"></div> <!-- 左 -->
```
> 边框的宽度均为 `1px`，边框样式均为 `solid`，颜色在下文说明。

## 颜色
> 可控制的颜色为字体颜色、背景颜色、边框颜色。  
> 所有的颜色均为 `rgba()` 形式。

```html
<div class="c-8"></div> <!-- color: rgba(0, 0, 0, 0.8) -->
<div class="bg-5"></div> <!-- background-color: rgba(34, 34, 34, 0.2) -->
<div class="bc-5"></div> <!-- border-color: rgba(0, 0, 0, 0.5) -->
```
> 其中 `bg-..` 后的数值的实际透明度为：`数值 / 25`

### 暗色模式下的颜色

要实现暗色模式，只需在根节点添加 `dk` 类。  
颜色将会是原来的反色：即浅色字体和边框以及深色背景。

### 交互效果下的颜色

若要实现鼠标交互效果，只需要在颜色类前面添加相应的装饰，例如：
```html
<div class="bg-2 hv:bg-3"></div>
<!-- 即正常为浅色背景，鼠标移上后为略深一些的颜色 -->
```
可使用的交互前缀为有：
- `hv:` = `hover`
- `at:` = `active`
- `fo:` = `focus`