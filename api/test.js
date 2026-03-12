export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Vercel API is working',
    url: req.url,
    method: req.method
  });
}
