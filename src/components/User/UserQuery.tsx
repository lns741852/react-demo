import React, { FC, useState } from 'react';
import { Space, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useResponsive } from '@/hooks/useResponsive';

// 1. 定義元件接收的 Props 規格
interface UserQueryProps {
    loading?: boolean;
    onSearch: (name: string, address: string) => void;
}

const UserQuery: FC<UserQueryProps> = ({ loading, onSearch }) => {
    const isMobile = useResponsive();


    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');


    const handleSearchClick = () => {
        onSearch(name, address);
    };

    return (
        <Space 
            direction={isMobile ? 'vertical' : 'horizontal'} 
            size={16} 
            style={{ width: '100%', marginBottom: 8 }}
        >
            <Input
                placeholder="搜尋姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                allowClear
                style={{ width: isMobile ? '100%' : 240 }}
            />
            <Input
                placeholder="搜尋地址"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                allowClear
                style={{ width: isMobile ? '100%' : 240 }}
            />
            <Button 
                type="primary" 
                icon={<SearchOutlined />} 
                loading={loading}
                onClick={handleSearchClick}
                style={{ width: isMobile ? '100%' : 'auto' }}
            >
                查詢
            </Button>
        </Space>
    );
};

// 使用 React.memo 進行優化：因為此元件內部只有純輸入框狀態，
// 當父元件的 Modal 開關（open）改變導致父元件重繪時，UserQuery 會直接跳過不必要的重繪。
export default React.memo(UserQuery);
