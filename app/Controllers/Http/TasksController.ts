import Task from '../../Models/Task'

export default class TasksController {
  public async index({ response }) {
    // fetch task from the db
    try {
      const tasks = await Task.query().paginate(1, 10)
      console.log('TASKS', tasks)
      // return the json response
      return response.status(200).json({
        messages: ['Successfully fetched your latest tasks'],
        data: tasks,
      })
    } catch (error) {
      return response.status(200).json({
        messages: ['Error'],
        data: {},
      })
    }
  }
  public async store({ request, response }) {
    // grab the request
    const taskData = request.body()
    console.log('taskData', taskData)
    // create a task
    try {
      const newTask = await Task.create({ title: taskData.title, task: taskData.task })
      console.log('newTask', newTask)

      // return response
      response.status(201).json({
        messages: ['Task Successfully Created'],
        data: newTask,
      })
    } catch (error) {
      response.status(422).json({
        messages: ['Please fill all the required fields'],
        data: {},
      })
    }
  }
  public async destroy({ params, response }) {
    try {
      const dbTask = await Task.findOrFail(params.id)
      await dbTask.delete()
      response.status(200).json({
        messages: [' Successfully Deleted'],
      })
    } catch (error) {
      response.status(404).json({
        messages: ['Error, Does not Exist'],
      })
    }
  }
  public async show({ params, response }) {
    try {
      const dbTask = await Task.findOrFail(params.id)
      response.status(200).json({
        messages: [' Successfully Fetched'],
        data: dbTask,
      })
    } catch (error) {
      response.status(404).json({
        messages: ['Error, Does not Exist'],
      })
    }
  }
  public async update({ request, response, params }) {
    try {
      //check if task exists
      const dbTask = await Task.findOrFail(params.id)

      //grab the request & request body
      const taskData = request.body()
      console.log('taskData update', taskData)
      dbTask.completed = JSON.parse(taskData.status)
      //json.parse to change the string passed from front end to boolean
      await dbTask.save()

      response.status(201).json({
        messages: [' Successfully Updated'],
        data: dbTask,
      })
    } catch (error) {
      response.status(403).json({
        messages: ['Update failed'],
        data: {},
      })
    }
  }

  // public async destroy({ params, response }: HttpContextContract)
  // {
  //       let result = await (new UserRepository()).destroy(params.id);

  //       return response.status(result.statusCode).json(result);
  // }
}

// export default class RolesController {

// 	public async index({ response } : HttpContextContract)
// 	{
//     const result = await (new RoleRepository()).index();

//     return response.status(result.statusCode).json(result);
//   }
// }
