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
    public class ItemCriteriaRepository
    {
        readonly string ConnectionString;
        public ItemCriteriaRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("SeekingClarity");
        }
        public IEnumerable<ItemCriteria> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                          from ItemCriteria";

            return db.Query<ItemCriteria>(sql).ToList();
        }
    }
}

