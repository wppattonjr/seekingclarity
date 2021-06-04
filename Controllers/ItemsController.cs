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
    [Route("api/Items")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        ItemRepository _repo;
        public ItemsController(ItemRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllItems()
        {
            var items = _repo.GetAll();

            return Ok(items);
        }

    }
}
