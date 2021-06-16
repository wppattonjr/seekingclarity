using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SeekingClarity.DataAccess;
using SeekingClarity.Models;

namespace SeekingClarity.Controllers
{
    [Route("api/ItemCriteria")]
    [ApiController]
    public class ItemCriteriaController : ControllerBase
    {
        ItemCriteriaRepository _repo;
        public ItemCriteriaController(ItemCriteriaRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllItemCriteria()
        {
            var itemCriteria = _repo.GetAll();

            return Ok(itemCriteria);
        }

        [HttpGet("{itemId}")]
        public IActionResult GetById(int itemId)
        {
            var item = _repo.Get(itemId);

            if (item == null)
            {
                return NotFound("This item id does not exist");
            }

            return Ok(item);
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateScore(ItemCriteria itemcriteria)
        {
            _repo.UpdateScore(itemcriteria);

            return Ok(itemcriteria);
        }

    }
}

