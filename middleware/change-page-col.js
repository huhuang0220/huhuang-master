/**
 * @file 响应布局-中间件 / ES module
 * @module middleware/change-page-col
 */

export default async ({
  route,
  store
}) => {

  // columns
  const fullColumn = ['about', 'project', 'sitemap'].includes(route.name)
  const errorColumn = ['music', 'app', 'service'].includes(route.name)

  // set columns
  if (store.state.option.fullColumn !== fullColumn) {
    store.commit('option/SET_FULL_COLUMU', fullColumn)
  }

  if (store.state.option.errorColumn !== errorColumn) {
    store.commit('option/SET_ERROR_COLUMU', errorColumn)
  }
}
