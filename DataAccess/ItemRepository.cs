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
    public class ItemRepository
    {
        readonly string ConnectionString;
        public ItemRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("SeekingClarity");
        }
        public IEnumerable<Item> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                          from Item";

            return db.Query<Item>(sql).ToList();
        }
    }
}
