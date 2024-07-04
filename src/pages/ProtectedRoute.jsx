import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user)
      setIsLoading(false);
    else
      setIsLoading(false);  // 이것을 세팅해야 로그인이 올바르게 처리됨
  }, [user]);

  if (isLoading)
    return null;

  if (!user) {
    alert('먼저 로그인을 해 주세요.');
    return (
        <Navigate to='/' replace={true} />
    );
  }

  if (requireAdmin && !user.isAdmin) {
    alert('관리자만 사용 가능한 메뉴입니다.');
    return (
        <Navigate to='/' replace={true} />
    );
  }

  return children;
}