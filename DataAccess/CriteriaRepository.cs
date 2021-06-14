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
    public class CriteriaRepository
    {
        readonly string ConnectionString;
        public CriteriaRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("SeekingClarity");
        }
        public IEnumerable<Criteria> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                          from Criteria";

            return db.Query<Criteria>(sql).ToList();
        }

        public IEnumerable<Criteria> Get(int itemId)
        {
            var sql = @"select
                        [Criteria].Id as CriteriaId,
                        [Criteria].[Name] as CriteriaName, 
                        [Criteria].GroupId as GroupId,
                        join ItemCriteria
                        on [ItemCriteria].CriteriaId = [Criteria].Id
                        where [ItemCriteria].CriteriaId = @ItemId";


            using var db = new SqlConnection(ConnectionString);

            return db.Query<Criteria>(sql, new { itemId }).ToList();
        }
    }
}
