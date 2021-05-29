using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeekingClarity.Models
{
    public class ItemCriteria
    {
        public int Id { get; set; }
        public int CriteriaId { get; set; }
        public int Score { get; set; }
        public int ItemId { get; set; }
        public bool IsActive { get; set; }

    }
}
