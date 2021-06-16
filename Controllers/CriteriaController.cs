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
    [Route("api/Criteria")]
    [ApiController]
    public class CriteriaController : ControllerBase
    {
        CriteriaRepository _repo;
        public CriteriaController(CriteriaRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var criteria = _repo.GetAll();

            return Ok(criteria);
        }

        [HttpGet]
        public IActionResult GetAllItemCriteria()
        {
            var criteria = _repo.GetAllItemCriteria();

            return Ok(criteria);
        }

     
        [HttpGet("score/{itemid}")]
        public IActionResult GetItemCriteria(int itemId)
        {
            var criteria = _repo.GetItemCriteria(itemId);

            if (criteria == null)
            {
                return NotFound("Criteria for this item does not exist");
            }

            return Ok(criteria);
        }
        public IActionResult AddProductGroup(Criteria criteria)
        {
            _repo.Add(criteria);

            return Created($"api/Criteria/{criteria.Id}", criteria);
        }

        [HttpPut("{criteriaid}")]
        public IActionResult UpdateCriteria(Criteria criteria)
        {
            _repo.UpdateCriteria(criteria);

            return Ok(criteria);
        }

    }
}
