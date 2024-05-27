export default () => ({
  crumbs: [],
  canI: [],
  locale: localStorage.getItem('locale'),
  theme: localStorage.getItem('theme') || '',
  preFetchData: {},
}
)
