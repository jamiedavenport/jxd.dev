import { createRoot } from "react-dom/client";
import { Agentation } from "agentation";

// Local feedback toolbar for the dev server. Annotations sync to the agentation-mcp server.
// Mounted outside <body> so it survives ClientRouter page swaps.
const container = document.createElement("div");
container.id = "agentation";
document.documentElement.append(container);
createRoot(container).render(<Agentation endpoint="http://localhost:4747" />);
