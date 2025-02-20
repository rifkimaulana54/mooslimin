export default async function handler(req, res) {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}product/v1_0/filter`, {
            method: 'POST', // Using POST method
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                // filter: req.body.filter,
                // page: req.body.page,
                // per_page: req.body.per_page,
                // sort: req.body.sort,
                // sort_by: req.body.sort_by,
            })
        });
        const data = await response.json();
        
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}