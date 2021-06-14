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
        public void Add(Item item)
        {
            var sql = @"INSERT INTO [Item] ([GroupId], [Name], [isActive], [Image])
                        OUTPUT inserted.Id
                        VALUES(@GroupId, @Name, @isActive, @Image)";

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
