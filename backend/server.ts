import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const data: string[] = ['List 1', 'List 2', 'List 3'];

// Get all items
app.get('/api/items', (req: Request, res: Response) => {
  res.json(data);
});

// Add a new item
app.post('/api/items', (req: Request, res: Response) => {
  const newItem = req.body.item;
  if (newItem) {
    data.push(newItem);
    res.status(201).json({ message: 'Item added successfully', data });
  } else {
    res.status(400).json({ message: 'Invalid item' });
  }
});

app.delete('/api/items/:id', (req: Request, res: Response) => {
  const itemId = decodeURIComponent(req.params.id);
  const index = data.findIndex((item) => item === itemId);
  if (index !== -1) {
    data.splice(index, 1);
    res.json({ message: 'Item deleted successfully', data });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
