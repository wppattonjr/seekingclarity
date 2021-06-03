using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SeekingClarity.DataAccess;
using SeekingClarity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeekingClarity.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UserRepository _repo;
        public UsersController(UserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]

        public IActionResult GetAllUsers()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var user = _repo.Get(id);

            if (user == null)
            {
                return NotFound("This user id does not exist");
            }

            return Ok(user);
        }
    }
}
