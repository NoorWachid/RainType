function CreateNode(type, attributes = {})
{
    const node = document.createElement(type);
    for (key in attributes) 
    {
        node[key] = attributes[key];
    }
    return node;
}

function AppendNodes(container, nodes) 
{
    for (node of nodes)
    {
        container.appendChild(node);
    }

    return container;
}

function AddClassNode(node, className)
{
    if (!node.classList.contains(className))
    {
        node.classList.add(className);
    }
}

function RemoveClassNode(node, className)
{
    if (node.classList.contains(className))
    {
        node.classList.remove(className);
    }
}
