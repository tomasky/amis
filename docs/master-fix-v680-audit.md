# master fix backport audit for v680

Range: `c1e924f^..43a33ee`, non-merge commits whose subject starts with `fix` (case insensitive). There are 53 such commits. Two merge subjects also contain `fix`; their changes are represented by the commits below.

## Backported or adapted (35)

`798309d72` Excel blob export; `dc1a0dd74` dialog/drawer mapped data root context (v680 has no global-variable store); `a096d73de` grouped/fixed table editor highlighting; `5bf487c1d` classNameExpr with fixed classes; `9742ab443` editor popover container; `875249761` fixed columns after visibility changes, using the parent column array so cells do not subscribe individually; `8441f91a1` CRUD item actions; `22eed9cd2` subeditor options and null option type; `83a4bd078`, `96f875b96`, `c866a0e02` HTML filter context; `4136e287c` UTC date normalization; `0c95fbb3d` Table2 drag initialization; `c796f5755` Card/Grid/HBox/List composition; `a63aa297a` default theme; `2ef1ef580` leading zero formula tokens; `d70a3e7b6` CRUD2 initialization; `677021c1e` dialog error overflow; `5613e182b`, `d85a8c240`, `0bb355b7d` tree state/action fixes (the tree path code from d85 already existed in v680); `2686c8cb8` empty JSON-schema key; `efc43d2c1` modal root-close behavior; `a67b4d5ae` popup scale rounding; `e41b4ef13` InputTree editor form configuration and flex empty-body guard; `53822ad70`, `baf30a5d7` CRUD2 column toggles; `18f8af7fa` condition builder default; `66e49b90c` canceled validation API; `1148ef8b6` HTML slash escaping; `2da7a7ca2` validation configuration errors, with explicit logging; `f62377c5b` TinyMCE disabled state; `ba3bd4adf` selection without a primary key; `2855bdbb8` quick-edit save API; `13c7ca095` InputText props.

For `e41b4ef13`, the editor drag ghost replacement and tree scan were left out: they are unrelated to the InputTree edit configuration and change drag behavior/cost. For `dc1a0dd74`, the master global-state implementation is unavailable on v680; only mapped data's existing root context/query chain was connected.

## Already present or superseded (9)

`9097cc257` placeholder click already focuses; `59f8a5ff1` InputTable page offset already applied (master also contains a stray `console.log`); `ace52356f` debugger already absent; `12d7b1846` nested CRUD pagination; `4feb2e1d4` AnchorNav overflow style; `4f66dffe2` Switch translation; `a10d77be5` editor width/height names; `870e0b91c` CRUD2 initial form values; `8dd63de88` empty commit, with its null case covered by `22eed9cd2`.

## No matching v680 implementation (3)

`9dc722485`, `516b47f36`: `vite-plugin-amisr` does not exist on v680. `cef002597`: the referenced Table2 `colWidths[index].realWidth` render line does not exist in v680; it depends on the newer width implementation.

## Not backported because the master patch adds hot-path work (6)

- `e5882a84b`: calls `filterClassNameObject` for every table cell, including static classes.
- `566a2c316`, `9298c787e`: broad Table2 width synchronization adds DOM measurement and state updates; the CSS follow-up assumes that implementation.
- `a1dfef1e7`: adds `toFixed(10)` and string conversion to each decimal `floor` evaluation.
- `fa9165c03`: adds width synchronization/layout reads for Table2 grouped headers during rendering.
- `27f2053fd`: scans all virtual rows on each scroll and measures all rendered rows on resize.

These six require a separate design that preserves or improves the existing CRUD/Table render and scroll cost.
