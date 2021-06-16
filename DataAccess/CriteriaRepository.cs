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

        public IEnumerable<ItemCriteriaScore> GetItemCriteria(int itemId)
        {
            var sql = @" SELECT
	                        Criteria.[Name] as CriteriaName,
	                        ItemCriteria.Score as CriteriaScore,
	                        Item.[Name] as ItemName,
	                        Item.Id as ItemId,
	                        [Group].Id as GroupId
                         FROM Criteria
                         JOIN ItemCriteria
	                        ON Criteria.Id = ItemCriteria.CriteriaId
                         JOIN Item
	                        ON Item.Id = ItemCriteria.ItemId
                         JOIN [Group]
	                        ON [Group].Id = Item.GroupId
                            WHERE Item.Id = @ItemId";


            using var db = new SqlConnection(ConnectionString);

            return db.Query<ItemCriteriaScore>(sql, new { itemId }).ToList();
        }

        public IEnumerable<ItemCriteriaScore> GetAllItemCriteria()
        {
            var sql = @" SELECT
	                        Criteria.[Name] as CriteriaName,
	                        ItemCriteria.Score as CriteriaScore,
	                        Item.[Name] as ItemName,
	                        Item.Id as ItemId,
	                        [Group].Id as GroupId
                         FROM Criteria
                         JOIN ItemCriteria
	                        ON Criteria.Id = ItemCriteria.CriteriaId
                         JOIN Item
	                        ON Item.Id = ItemCriteria.ItemId
                         JOIN [Group]
	                        ON [Group].Id = Item.GroupId";

            using var db = new SqlConnection(ConnectionString);

            return db.Query<ItemCriteriaScore>(sql).ToList();

        }
        public void Add(Criteria criteria)
        {
            var sql = @"INSERT INTO Criteria ([Name], [GroupId], [isActive])
                        OUTPUT inserted.Id
                        VALUES(@Name, @GroupId, 1)

                        insert into ItemCriteria(CriteriaId,ItemId,IsActive, Score)
                        select c.id as criteriaid, i.id as itemid, 1 as isactive, 0
                        from criteria c
                        join Item i on i.GroupId = c.GroupId
                        where c.Id = SCOPE_IDENTITY()";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, criteria);

            criteria.Id = id;
        }

        public void UpdateCriteria(Criteria criteria)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [Criteria]
                        SET [Name] = @Name,
                            [GroupId] = @GroupId,
                        WHERE Id = @Id";

            db.Execute(sql, criteria);
        }
    }
}
