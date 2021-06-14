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
    [Route("api/Groups")]
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

        [HttpGet("groupids")]
        public IActionResult GetAllGroupIds()
        {
            var GroupIds = _repo.GetAllGroupIds();

            return Ok(GroupIds);
        }

        [HttpGet("all/{userId}")]
        public IActionResult GetAllUserProducts(string userId)
        {
            var products = _repo.GetAllUserProducts(userId);

            if (products == null)
            {
                return NotFound("You have no products at this time.");
            }

            return Ok(products);
        }

        [HttpGet("{groupId}")]
        public IActionResult GetById(int groupId)
        {
            var group = _repo.Get(groupId);

            if (group == null)
            {
                return NotFound("This group id does not exist");
            }

            return Ok(group);
        }

        [HttpPost]
        public IActionResult AddProductGroup(Group group)
        {
            _repo.Add(group);

            return Created($"api/Groups/{group.Id}", group);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProductGroup(Group group)
        {
            _repo.Update(group);

            return Ok(group);
        }

        [HttpPut("{id}/disable")]
        public IActionResult DisableGroup(int id)
        {
            _repo.Disable(id);

            return NoContent();
        }
    }
}
