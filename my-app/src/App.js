import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터를 가져오는 함수
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users");
      if (!response.ok) {
        throw new Error("데이터를 가져오지 못했습니다.");
      }
      const data = await response.json();
      setUsers(data.users); // FastAPI에서 받은 데이터
      setLoading(false);
    } catch (error) {
      console.error("에러 발생:", error);
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>사용자 목록</h1>
      {loading ? (
        <p>데이터를 불러오는 중...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>ID:</strong> {user.id} <br />
              <strong>이름:</strong> {user.name} <br />
              <strong>전화번호:</strong> {user.phone} <br />
              <strong>나이:</strong> {user.age} <br />
              <strong>직업:</strong> {user.job}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
