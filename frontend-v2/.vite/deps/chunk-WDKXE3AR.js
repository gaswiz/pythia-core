import {
  __toESM,
  require_react
} from "./chunk-UCCAB3TN.js";

// node_modules/@tabler/icons-react/dist/esm/createReactComponent.mjs
var import_react = __toESM(require_react(), 1);

// node_modules/@tabler/icons-react/dist/esm/defaultAttributes.mjs
var defaultAttributes = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};

// node_modules/@tabler/icons-react/dist/esm/createReactComponent.mjs
var createReactComponent = (type, iconName, iconNamePascal, iconNode) => {
  const Component = (0, import_react.forwardRef)(
    ({ color = "currentColor", size = 24, stroke = 2, title, className, children, ...rest }, ref) => (0, import_react.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes[type],
        width: size,
        height: size,
        className: [`tabler-icon`, `tabler-icon-${iconName}`, className].join(" "),
        ...type === "filled" ? {
          fill: color
        } : {
          strokeWidth: stroke,
          stroke: color
        },
        ...rest
      },
      [
        title && (0, import_react.createElement)("title", { key: "svg-title" }, title),
        ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );
  Component.displayName = `${iconNamePascal}`;
  return Component;
};

export {
  createReactComponent
};
/*! Bundled license information:

@tabler/icons-react/dist/esm/defaultAttributes.mjs:
@tabler/icons-react/dist/esm/createReactComponent.mjs:
  (**
   * @license @tabler/icons-react v3.33.0 - MIT
   *
   * This source code is licensed under the MIT license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-WDKXE3AR.js.map
