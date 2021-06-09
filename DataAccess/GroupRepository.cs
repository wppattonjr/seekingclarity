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
    public class GroupRepository
    {
        readonly string ConnectionString;

        public GroupRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("SeekingClarity");
        }

        public IEnumerable<Group> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                        from [Group]";

            return db.Query<Group>(sql).ToList();
        }

        public IEnumerable<Group> GetAllUserProducts(string userId)
        {
            var sql = @"select * from [Group] 
	                      join [User]
		                    on [Group].UserId = [User].Id
                        WHERE [User].FirebaseId = @userId";


            using var db = new SqlConnection(ConnectionString);

            return db.Query<Group>(sql, new { userId }).ToList();
        }

        public void Add(Group group)
        {
            var sql = @"INSERT INTO [Group] ([UserId], [Name], [Category], [isActive], [Image])
                        OUTPUT inserted.Id
                        VALUES(@UserId, @Name, @Category, @isActive, @Image)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, group);

            group.Id = id;
        }

        public void Update(Group group)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [Group]
                        SET [UserId] = @UserId,
                            [Name] = @Name,
                            [Category] = @Category,
                            [IsActive] = @IsActive,
                            [Image] = @Image
                        WHERE Id = @id";

            db.Execute(sql, group);
        }

      
     

    }
}
