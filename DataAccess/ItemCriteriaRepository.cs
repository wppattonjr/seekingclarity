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

        public IEnumerable<ItemCriteriaScore> Get(int itemid)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT
                        Criteria.Id as CriteriaId,
	                    Criteria.[Name] as CriteriaName,
	                    ItemCriteria.Score as CriteriaScore,
	                    Item.[Name] as ItemName,
	                    Item.Id as ItemId
	                FROM Criteria
                    JOIN ItemCriteria
	                ON Criteria.Id = ItemCriteria.CriteriaId
                    Join Item
	                ON [Item].Id = ItemCriteria.ItemId
                    WHERE [Item].Id = @ItemId";

            var itemcriteria = db.Query<ItemCriteriaScore>(sql, new { itemid });

            return itemcriteria;
        }
        public void AddItemCriteria(ItemCriteria itemcriteria)
        {
            var sql = @"INSERT INTO ItemCriteria ([CtriteriaId], [Score], [ItemId], [isActive])
                        OUTPUT inserted.Id
                        VALUES(@CriteriaId, @Score, @ItemId, @isActive)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, itemcriteria);

            itemcriteria.Id = id;
        }

        public void UpdateScore(ItemCriteria itemcriteria)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [ItemCriteria]
                        SET [Score] = @Score
                        WHERE Id = @Id";

            db.Execute(sql, itemcriteria);
        }
    }
}

