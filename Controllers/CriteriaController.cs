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

        [HttpGet]
        public IActionResult GetAllCriteria()
        {
            var criteria = _repo.GetAll();

            return Ok(criteria);
        }

        [HttpGet("{criteriaId}")]
        public IActionResult GetById(int criteriaId)
        {
            var criteria = _repo.Get(criteriaId);

            if (criteria == null)
            {
                return NotFound("This user item does not exist");
            }

            return Ok(criteria);
        }
    }
}
