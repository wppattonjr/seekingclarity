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

        public IEnumerable<Item> GetAllGroupItems(int groupId)
        {
            var sql = @"select * from [Item]
		                    where GroupId = @GroupId";
                       
            using var db = new SqlConnection(ConnectionString);

            return db.Query<Item>(sql, new { groupId }).ToList();
        }

        public IEnumerable<Item> GetSingleItem(int itemId)
        {
            var sql = @"select * from [Item]
		                    where [Item].Id = @ItemId";

            using var db = new SqlConnection(ConnectionString);

            return db.Query<Item>(sql, new { itemId }).ToList();
        }
        public void Add(Item item)
        {
            var sql = @"insert into Item(GroupId,Image,Name,IsActive)
                        values(@groupid,@image,@name,@isactive)

                        insert into ItemCriteria(CriteriaId,ItemId,IsActive, Score)
                        select c.id as criteriaid, i.id as itemid, 1 as isactive, 0
                        from criteria c
                        join Item i on i.GroupId = c.GroupId
                        where i.Id = SCOPE_IDENTITY()";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, item);

            item.Id = id;
        }
        public void Update(Item item)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [Item]
                        SET [GroupId] = @GroupId,
                            [Name] = @Name,
                            [IsActive] = @IsActive,
                            [Image] = @Image
                        WHERE Id = @Id";

            db.Execute(sql, item);
        }

    }
}
