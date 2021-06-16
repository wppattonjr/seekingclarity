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

        public IEnumerable<Group> GetAllGroupIds()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select 
                        [Group].Id as GroupId,
                        [Group].Name as GroupName
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

        public IEnumerable<Group> Get(int groupid)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                          from [Group]
                          where [Group].Id = @groupid";

            var group = db.Query<Group>(sql, new { groupid });

            return group;
        }
        public void Add(Group group)
        {
            var sql = @"INSERT INTO [Group] ([UserId], [Name], [Category], [isActive], [GroupReview])
                        OUTPUT inserted.Id
                        VALUES(@UserId, @Name, @Category, @isActive, @GroupReview)";

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
                            [GroupReview] = @GroupReview
                        WHERE Id = @Id";

            db.Execute(sql, group);
        }
        public void Disable(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Update [Group]
                        set IsActive = 0
                        where Id = @id";

            db.Execute(sql, new { id });
        }

      
     

    }
}
