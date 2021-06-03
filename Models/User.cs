using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeekingClarity.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FirebaseId { get; set; }
        public string EmailAddress { get; set; }

    }
}
