import Route from '@ioc:Adonis/Core/Route'

export default async function pagination(request, Model, routeName) {
  const params = request.qs()
  const offset = Number(params?.offset || 0)
  const limit = Number(params?.limit || 10)

  const results = await Model.query().limit(limit).offset(offset)

  const next =
    results.length === limit
      ? Route.makeUrl(routeName, {
          qs: {
            offset: offset + limit,
            limit: limit,
          },
        })
      : null

  const prev =
    offset - limit >= 0
      ? Route.makeUrl(routeName, {
          qs: {
            offset: offset - limit,
            limit: limit,
          },
        })
      : null

  return { next, prev, results }
}
