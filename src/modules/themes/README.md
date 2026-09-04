# Themes

本目录负责前端主题入口、主题变量和主题样式扩展。

## 主题入口

- `themes/theme.vue`：默认主题入口。
- `themes/theme2.vue`：第二主题入口。
- `themes/dark.vue`：暗色主题入口。
- `styles/theme.scss`：默认主题样式入口。
- `styles/theme2.scss`：第二主题样式入口。
- `styles/dark.scss`：暗色主题样式入口。

新增后台子页面样式时，默认以 `styles/theme.scss` 的组织方式为准。

## 文件如何生效

新增样式文件不会自动生效，必须从对应主题入口引入。

默认主题的新增页面样式建议放在：

```text
styles/
└── pages/
    ├── page-name.scss
    └── another-page.scss
```

然后在 `styles/theme.scss` 的扩展层中引入：

```scss
@scope (.admin-layout) {
  @import './pages/page-name';
}
```

如果样式会被两个以上页面复用，应放入 `styles/theme/` 的合适文件，而不是复制到多个页面文件中。新增文件前先确认没有同名或同职责的已有文件。

## 作用域

后台页面的根节点是 `.admin-layout`。新增规则必须限制在后台布局内：

```scss
.admin-layout {
  .page-example {
    ...
  }
}
```

默认主题的扩展样式通过 `@scope (.admin-layout)` 引入。这个作用域目前只保证默认主题入口中的扩展层，不代表 `theme2.scss` 和 `dark.scss` 自动拥有相同作用域。新增规则仍必须显式以 `.admin-layout` 为边界。

不要在主题文件中新增不带布局作用域的业务页面选择器，也不要直接修改 `#q-app`、`body` 或 Quasar 的全局类。`default.scss` 中已有的全局工具类属于历史兼容代码，新代码不要继续扩展这种写法。

主题变量可以定义在主题类上：

```scss
.theme-EISThemeDefault {
  --q-primary: ...;
}
```

主题变量用于表达主题差异，页面样式应通过变量取值，不要在页面样式中重复写主题颜色。

## 现有变量

优先复用仓库中已经使用的变量名，不要为同一含义创建新名字：

- `--bodyBackground`
- `--background`
- `--field-label-width`
- `--field-label-font-size`
- `--field-label-color`
- `--field-label-after`
- `--field-label-required-color`
- `--editor-area-background`
- `--table-row-height`
- `--body-background`
- `--zebra-even-color`
- `--zebra-odd-color`
- `--zebraEvenColor`
- `--zebraOddColor`
- `--editorAreaBackground`
- `--simpleFieldWidth`
- `--tableCellHeight`
- `--primary`
- `--fieldLabelWidth`
- `$bodyBackground`
- `$background`
- `$fieldLabelWidth`
- `$fieldLabelFontSize`
- `$fieldLabelColor`
- `$fieldLabelAfter`
- `$tableRowHeight`

变量命名后续如需整理，应单独进行兼容性评估，不要和页面样式开发同时大规模重命名。

新增变量前必须先在 `styles/` 全目录搜索。即使两个变量名称只差连字符或大小写，也先确认它们是否已有历史使用，不能直接创建同义变量。

## 样式分层

按以下顺序判断样式应该放在哪里：

1. `styles/default.scss`：已有 Sass 默认变量和跨主题基础工具样式。
2. `styles/theme.scss`、`theme2.scss`、`dark.scss`：主题入口和主题专属变量。
3. `styles/theme/`：多个页面复用的布局、组件或业务模块样式。
4. 新增页面样式目录：只放单个页面专属规则，不重复定义公共组件。

当前扩展文件的约定：

- `theme/web.sass`：后台 Web 布局和公共页面规则。
- `theme/flows.sass`：流程相关规则。
- `theme/adminTree.sass`：树形管理规则。
- `theme/systemConfig.sass`：系统配置规则。

完全相同的样式在两个以上页面出现时，才提取到复用层；只使用一次的规则留在页面样式中。

现有文件中可能已经存在重复或相互覆盖的历史规则，例如分页、表格和字段包装器规则。它们视为待整理项，不要在新页面中继续复制。需要覆盖旧规则时，优先修改原定义；确实需要局部覆盖时，必须使用页面根类限制范围，并说明覆盖原因。

## 选择器和覆盖规则

- 新代码默认不使用 `!important`。
- 只有覆盖 Quasar 组件高优先级默认规则、内联样式或明确状态规则时才保留。
- 优先通过准确的 `.admin-layout`、页面类和组件状态类解决覆盖问题。
- 选择器尽量不超过三层。
- “不超过三层”只约束新增代码，暂不要求一次性重构所有历史选择器。
- 一个公共选择器只在一个文件中定义主规则。
- 页面样式不得反向修改公共组件的基础行为。

新增 `!important` 时必须能回答三个问题：覆盖的是哪条规则、为什么提高选择器优先级仍不够、是否会影响其他主题或页面。不能用 `!important` 掩盖重复定义或错误的作用域。

新增类名、变量名和公共组件规则前，先搜索整个 `styles/` 目录，确认没有已有定义或同义实现。

## 页面骨架

子页面尽量遵循统一结构：

```text
page
├── page-header
│   ├── page-title
│   └── page-actions
├── page-toolbar
├── page-content
└── pagination / page-footer
```

页面之间应复用页头、工具栏、表格、表单、空状态、加载状态和分页的结构与样式。

复用判断：结构相同但颜色不同，应复用结构并使用主题变量；只有少量属性相似但结构不同，不要为了消除少量重复而强行抽象。页面专属规则不得放入 `web.sass`，公共样式也不得依赖某个具体业务页面名称。

## 新增样式检查

提交前至少确认：

- 规则位于 `.admin-layout` 作用域内。
- 新文件已经从对应主题入口引入并实际参与构建。
- 新增类名、变量名和选择器已经完成全目录搜索。
- 没有重复定义已有公共选择器。
- 没有无理由新增 `!important`。
- 没有为现有变量创建同义变量。
- 默认主题、暗色主题和窄屏布局没有明显回归。
- `yarn lint` 和 `yarn build:dev` 通过。
