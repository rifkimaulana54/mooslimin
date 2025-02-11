export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method Not Allowed" });
        }

        // Pastikan body bisa dibaca
        let { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: req.body });
        }
        const response = await fetch(`${process.env.API_BASE_URL}product/v1_0/detail/`+req.body.id, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const data = await response.json();
        
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}