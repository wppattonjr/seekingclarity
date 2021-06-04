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
    }
}

