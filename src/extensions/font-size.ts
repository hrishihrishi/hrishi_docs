import { Extension } from "@tiptap/react";
import "@tiptap/extension-text-style";

/**
 * Augments Tiptap's command registry so TypeScript knows about
 * `setFontSize` and `unsetFontSize` without needing a custom editor type.
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSizeExtension = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize,
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            }
          }
        }
      }
    ]
  },
  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }) => {
        return chain()
          .setMark("textStyle", { fontSize })
          .run()
      },
      // Setting fontSize to null then calling removeEmptyTextStyle cleans up
      // the <span> wrapper when no other text-style attributes remain.
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .setMark("textStyle", { fontSize: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
});
