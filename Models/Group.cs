using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeekingClarity.Models
{
    public class Group
    {
        public int Id { get; set; }
        public int CriteriaId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public DateTime DateCreated { get; set; }
        public int UserId { get; set; }
        public bool IsActive { get; set; }
        public string Image { get; set; }

    }
}
