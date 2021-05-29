using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeekingClarity.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int GroupId { get; set; }
        public bool IsActive { get; set; }

    }
}
