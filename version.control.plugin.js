export default function versionControlPlugin(options = {}) {
  const defaultOptions = {
    o: '__v.json',
    v: Date.now(),
  }
  const finalOptions = { ...defaultOptions, ...options }

  return {
    name: 'version-control-plugin',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: finalOptions.o,
        source: JSON.stringify({ v: finalOptions.v }),
      })
    },
  }
}
