using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SeekingClarity.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace SeekingClarity.DataAccess
{
    public class ReviewRepository
    {
        readonly string ConnectionString;

        public ReviewRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("SeekingClarity");
        }

        public IEnumerable<Review> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from Review";

            return db.Query<Review>(sql).ToList();




        }

    }
}
