using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private static List<TodoItem> todos = new List<TodoItem>();
        [HttpGet]
        public IActionResult GetTodos(){
            return Ok(todos);
        }

        [HttpPost]
        public IActionResult AddTodo(TodoItem item){
            if (string.IsNullOrWhiteSpace(item.Title))
                return BadRequest("Title is required");
            item.Id = todos.Count == 0 ? 1 : todos.Max(t => t.Id) + 1;
            item.IsCompleted = false;
            todos.Add(item);
            return Ok(item);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id){
            var todo = todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
                return NotFound("Task not found");
            todos.Remove(todo);
            return Ok("Task deleted");
        }
    }
}