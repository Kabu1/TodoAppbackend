import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  console.log('WE ARE HERE')

  Route.get('/tasks', 'TasksController.index')

  Route.get('/tasks/:id', 'TasksController.show')
  Route.post('/tasks/new', 'TasksController.store')
  Route.patch('/tasks/progress/:id', 'TasksController.update')
  Route.delete('/tasks/delete/:id', 'TasksController.destroy')
})

// Route.get('/', async () => {
//   return { hello: 'world' }
// })
