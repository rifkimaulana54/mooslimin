export default async function handler(req, res) {
    try {
        const response = await await fetch(`${process.env.API_BASE_URL}user/v1_0/menus`, {
            method: 'POST', // Using POST method
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                filter: '{"menu_type":["top_menu"]}',
                // page: "1",
                // per_page: "5",
                sort: "asc",
                sort_by: "order",
            })
        });
        const data = await response.json();
        
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}