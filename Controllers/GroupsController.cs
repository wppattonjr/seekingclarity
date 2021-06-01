using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SeekingClarity.Models;
using SeekingClarity.DataAccess;

namespace SeekingClarity.Controllers
{
    [Route("api/groups")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        GroupRepository _repo;
        public GroupsController(GroupRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllGroups()
        {
            var Groups = _repo.GetAll();

            return Ok(Groups);
        }
    }
}
