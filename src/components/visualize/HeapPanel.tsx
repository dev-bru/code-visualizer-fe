/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Enhanced HeapPanel with Object Graph Visualization
// This component maps Python Tutor's heap to visual object diagrams

import React from 'react';

// interface HeapObject {
//   type: string;
//   data?: any;
//   properties?: Array<[string, any]>;
// }

// interface HeapInstance {
//   [key: string]: Array<any>;
// }

const EnhancedHeapPanel = ({ heap = {} }: { heap?: Record<string, any> }) => {
  /**
   * Renders different heap types with proper visualization
   * - CLASS: Yellow box with class name and methods
   * - INSTANCE: Box with properties, connected to CLASS
   * - FUNCTION: Purple italic text
   * - LIST: Blue array notation
   * - DICT: Orange dict notation
   * - REF: Arrow pointing to heap object
   */

  const renderHeapValue = (value: any, heapId?: string): React.ReactNode => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';

    // Handle references
    if (Array.isArray(value) && value[0] === 'REF') {
      return (
        <span style={heapStyles.reference}>
          REF → {value[1]}
        </span>
      );
    }

    // Not an array, return primitive
    if (!Array.isArray(value)) {
      return String(value);
    }

    const [type, ...rest] = value;

    switch (type) {
      case 'CLASS':
        return renderClass(type, rest, heapId);
      case 'INSTANCE':
        return renderInstance(rest, heapId);
      case 'FUNCTION':
        return <span style={heapStyles.function}>&lt;function {rest[0]}&gt;</span>;
      case 'LIST':
        return renderList(rest[0]);
      case 'DICT':
        return renderDict(rest[0]);
      case 'TUPLE':
        return renderTuple(rest[0]);
      default:
        return String(value);
    }
  };

  const renderClass = (type: string, rest: any[], heapId?: string): React.ReactNode => {
    const [name, methods, classMethods] = rest;
    return (
      <div style={heapStyles.classBox}>
        <div style={heapStyles.classHeader}>{name}</div>
        {Array.isArray(methods) && methods.length > 0 && (
          <div style={heapStyles.methodsList}>
            {methods.map((method: any, idx: number) => (
              <div key={idx} style={heapStyles.methodItem}>
                <span style={heapStyles.methodName}>{method}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderInstance = (rest: any[], heapId?: string): React.ReactNode => {
    const [name, ...properties] = rest;
    
    return (
      <div style={heapStyles.instanceBox}>
        <div style={heapStyles.instanceHeader}>{name}</div>
        <div style={heapStyles.instanceProperties}>
          {properties.map((prop: any, idx: number) => {
            if (Array.isArray(prop) && prop.length === 2) {
              const [propName, propValue] = prop;
              return (
                <div key={idx} style={heapStyles.property}>
                  <span style={heapStyles.propName}>{propName}</span>
                  <span style={heapStyles.propSeparator}>:</span>
                  <span style={heapStyles.propValue}>
                    {renderHeapValue(propValue)}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  const renderList = (content: any): React.ReactNode => {
    if (!Array.isArray(content)) {
      return <span style={heapStyles.list}>[]</span>;
    }
    const items = content.map((item, idx) => (
      <span key={idx}>
        {renderHeapValue(item)}
        {idx < content.length - 1 && ', '}
      </span>
    ));
    return <span style={heapStyles.list}>[{items}]</span>;
  };

  const renderDict = (content: any): React.ReactNode => {
    if (typeof content !== 'object' || content === null) {
      return <span style={heapStyles.dict}>{'{}'}</span>;
    }
    const pairs = Object.entries(content).map(([k, v], idx, arr) => (
      <span key={k}>
        <span style={heapStyles.dictKey}>{k}</span>: {renderHeapValue(v)}
        {idx < arr.length - 1 && ', '}
      </span>
    ));
    return <span style={heapStyles.dict}>{'{'}  {pairs} {'}'}</span>;
  };

  const renderTuple = (content: any): React.ReactNode => {
    if (!Array.isArray(content)) {
      return <span style={heapStyles.tuple}>()</span>;
    }
    const items = content.map((item, idx) => (
      <span key={idx}>
        {renderHeapValue(item)}
        {idx < content.length - 1 && ', '}
      </span>
    ));
    return <span style={heapStyles.tuple}>({items})</span>;
  };

  const heapEntries = Object.entries(heap);

  return (
    <div style={heapStyles.panel}>
      <div style={heapStyles.header}>
        <span>💾</span>
        <span style={heapStyles.title}>Heap Objects</span>
      </div>
      <div style={heapStyles.content}>
        {heapEntries.length === 0 ? (
          <div style={heapStyles.emptyState}>Heap is empty</div>
        ) : (
          <div style={heapStyles.heapList}>
            {heapEntries.map(([heapId, value]) => (
              <div key={heapId} style={heapStyles.heapItem}>
                <div style={heapStyles.heapIdLabel}>ID {heapId}</div>
                <div style={heapStyles.heapValue}>
                  {renderHeapValue(value, heapId)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const heapStyles = {
  panel: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden' as const,
    height: '100%',
  },
  header: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: '#f9f9f7',
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '8px',
  },
  title: {
    color: 'var(--color-text)',
  },
  content: {
    flex: 1,
    overflow: 'auto' as const,
    padding: '12px 16px',
    fontFamily: 'var(--font-family-mono)',
    fontSize: '12px',
    lineHeight: '1.8',
  },
  emptyState: {
    color: 'var(--color-text-light)',
    fontStyle: 'italic',
    padding: '20px 0',
    textAlign: 'center' as const,
  },
  heapList: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '16px',
  },
  heapItem: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '8px',
    padding: '12px',
    backgroundColor: '#fafaf8',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
  },
  heapIdLabel: {
    color: 'var(--color-primary)',
    fontWeight: 'var(--font-weight-bold)',
    fontSize: '11px',
    marginBottom: '4px',
  },
  heapValue: {
    color: 'var(--color-text)',
    wordBreak: 'break-all' as const,
  },

  // Class rendering
  classBox: {
    display: 'inline-block',
    border: '2px solid #f4d03f',
    backgroundColor: '#fffef0',
    borderRadius: '4px',
    padding: '8px',
    fontFamily: 'var(--font-family-mono)',
  },
  classHeader: {
    fontWeight: 'var(--font-weight-bold)',
    backgroundColor: '#f4d03f',
    padding: '4px 8px',
    marginBottom: '4px',
    borderRadius: '2px',
    fontSize: '11px',
  },
  methodsList: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '2px',
  },
  methodItem: {
    fontSize: '10px',
    padding: '2px 4px',
    color: '#666',
  },
  methodName: {
    fontStyle: 'italic',
    color: '#666',
  },

  // Instance rendering
  instanceBox: {
    display: 'inline-block',
    border: '2px solid #fff4e6',
    backgroundColor: '#fffef0',
    borderRadius: '4px',
    padding: '8px',
    fontFamily: 'var(--font-family-mono)',
    minWidth: '80px',
  },
  instanceHeader: {
    fontWeight: 'var(--font-weight-bold)',
    backgroundColor: '#fff4e6',
    padding: '4px 8px',
    marginBottom: '4px',
    borderRadius: '2px',
    fontSize: '11px',
    color: '#333',
  },
  instanceProperties: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '3px',
  },
  property: {
    display: 'flex' as const,
    gap: '4px',
    fontSize: '11px',
    padding: '2px 4px',
  },
  propName: {
    fontWeight: 'var(--font-weight-semibold)',
    color: '#333',
    minWidth: '40px',
  },
  propSeparator: {
    color: '#999',
  },
  propValue: {
    color: '#666',
  },

  // Type-specific rendering
  function: {
    color: '#9966cc',
    fontStyle: 'italic',
    fontSize: '11px',
  },
  list: {
    color: '#0066cc',
    fontSize: '11px',
  },
  dict: {
    color: '#cc6600',
    fontSize: '11px',
  },
  dictKey: {
    color: '#cc6600',
    fontWeight: 'var(--font-weight-semibold)',
  },
  tuple: {
    color: '#008800',
    fontSize: '11px',
  },
  reference: {
    color: 'var(--color-reference)',
    fontWeight: 'var(--font-weight-semibold)',
    textDecoration: 'underline',
    cursor: 'pointer',
    transition: 'color 0.15s ease',
    fontSize: '11px',
  },
};

export default EnhancedHeapPanel;


/* ============================================================
   HEAP PANEL WITH OBJECT GRAPH VISUALIZATION
   ============================================================ */

/**
 * Advanced HeapPanel that creates visual object diagrams like Python Tutor
 * Maps complex nested structures to connected boxes
 */

interface ObjectNode {
  id: string;
  type: string;
  label: string;
  fields: Array<{ name: string; value: any }>;
  children: string[]; // IDs of referenced objects
}

const AdvancedHeapVisualization = ({ heap = {} }: { heap?: Record<string, any> }) => {
  /**
   * Parse heap and create object graph
   */
  const parseHeap = (): ObjectNode[] => {
    return Object.entries(heap).map(([id, value]) => {
      if (!Array.isArray(value)) {
        return {
          id,
          type: 'PRIMITIVE',
          label: String(value),
          fields: [],
          children: [],
        };
      }

      const [type, ...rest] = value;
      let fields: Array<{ name: string; value: any }> = [];
      const children: string[] = [];

      switch (type) {
        case 'INSTANCE':
          const [className, ...props] = rest;
          fields = props.map((prop: any) => {
            if (Array.isArray(prop) && prop.length === 2) {
              const [name, val] = prop;
              if (Array.isArray(val) && val[0] === 'REF') {
                children.push(String(val[1]));
              }
              return { name, value: val };
            }
            return { name: '', value: prop };
          });
          return { id, type, label: className, fields, children };

        case 'CLASS':
          const [cname, methods] = rest;
          return { id, type, label: cname, fields: [], children: [] };

        default:
          return { id, type, label: type, fields: [], children };
      }
    });
  };

  const nodes = parseHeap();

  /**
   * Render object with connection visualization
   */
  const renderObjectNode = (node: ObjectNode): React.ReactNode => {
    if (node.type === 'PRIMITIVE') {
      return (
        <div style={advancedHeapStyles.primitiveBox}>
          {node.label}
        </div>
      );
    }

    if (node.type === 'INSTANCE') {
      return (
        <div style={advancedHeapStyles.objectBox}>
          <div style={advancedHeapStyles.objectHeader}>
            <div style={advancedHeapStyles.objectId}>ID {node.id}</div>
            <div style={advancedHeapStyles.objectType}>{node.label}</div>
          </div>
          <div style={advancedHeapStyles.objectFields}>
            {node.fields.map((field, idx) => (
              <div key={idx} style={advancedHeapStyles.field}>
                <div style={advancedHeapStyles.fieldName}>{field.name}</div>
                <div style={advancedHeapStyles.fieldValue}>
                  {Array.isArray(field.value) && field.value[0] === 'REF' ? (
                    <span style={advancedHeapStyles.refArrow}>→ ID {field.value[1]}</span>
                  ) : (
                    String(field.value)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return <div>{node.type}</div>;
  };

  return (
    <div style={advancedHeapStyles.container}>
      <div style={advancedHeapStyles.header}>
        <span>🔗</span>
        <span style={advancedHeapStyles.title}>Object Graph</span>
      </div>
      <div style={advancedHeapStyles.content}>
        <div style={advancedHeapStyles.graphContainer}>
          {nodes.map((node) => (
            <div key={node.id} style={advancedHeapStyles.nodeWrapper}>
              {renderObjectNode(node)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const advancedHeapStyles = {
  container: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden' as const,
    height: '100%',
  },
  header: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: '#f9f9f7',
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '8px',
  },
  title: {
    color: 'var(--color-text)',
  },
  content: {
    flex: 1,
    overflow: 'auto' as const,
    padding: '12px 16px',
  },
  graphContainer: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '16px',
  },
  nodeWrapper: {
    display: 'flex' as const,
    alignItems: 'flex-start' as const,
    marginBottom: '12px',
  },

  // Primitive values
  primitiveBox: {
    padding: '8px 12px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'var(--font-family-mono)',
  },

  // Object boxes (like Python Tutor)
  objectBox: {
    display: 'inline-block',
    border: '2px solid #fff4e6',
    borderRadius: '6px',
    backgroundColor: '#fffef0',
    minWidth: '120px',
    overflow: 'hidden' as const,
  },
  objectHeader: {
    display: 'flex' as const,
    backgroundColor: '#fff4e6',
    borderBottom: '1px solid #e0d8c4',
    padding: '6px 8px',
    gap: '8px',
    alignItems: 'center' as const,
  },
  objectId: {
    fontSize: '10px',
    fontWeight: 'var(--font-weight-bold)',
    color: '#666',
    minWidth: '50px',
  },
  objectType: {
    fontSize: '11px',
    fontWeight: 'var(--font-weight-bold)',
    color: '#333',
    flex: 1,
  },
  objectFields: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    padding: '6px 8px',
    gap: '4px',
  },
  field: {
    display: 'flex' as const,
    justifyContent: 'space-between',
    fontSize: '11px',
    padding: '2px 4px',
    gap: '8px',
  },
  fieldName: {
    fontWeight: 'var(--font-weight-semibold)',
    color: '#333',
    minWidth: '40px',
  },
  fieldValue: {
    color: '#666',
    fontFamily: 'var(--font-family-mono)',
  },
  refArrow: {
    color: 'var(--color-primary)',
    fontWeight: 'var(--font-weight-semibold)',
    textDecoration: 'underline',
  },
};

export { AdvancedHeapVisualization, EnhancedHeapPanel };