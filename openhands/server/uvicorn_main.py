# openhands/server/uvicorn_main.py
import os
import socket
import sys

import uvicorn


def get_env_var(name: str, default: str) -> str:
    """获取环境变量或返回默认值"""
    return os.environ.get(name, default)


def check_port_available(host: str, port: int) -> bool:
    """检查端口是否可用"""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(1)
            s.bind((host, port))
        return True
    except socket.error:
        return False


def main():
    # 从环境变量获取配置（兼容 Makefile）
    host = get_env_var('BACKEND_HOST', '127.0.0.1')
    port = int(get_env_var('BACKEND_PORT', '3000'))
    reload = os.getenv('UVICORN_RELOAD', 'false').lower() == 'true'
    reload_excludes = os.getenv('RELOAD_EXCLUDE', './workspace').split(',')

    # 打印启动信息
    print(f'🚀 Starting OpenHands backend server on {host}:{port}')
    print(f"🔄 Reload mode: {'Enabled' if reload else 'Disabled'}")

    # 端口检查逻辑（与 Makefile 中的 nc 检查等效）
    if not check_port_available(host, port):
        print(f'❌ Port {port} is already in use!')
        sys.exit(1)

    # 配置项
    uvicorn_args = {
        'app': 'openhands.server.listen:app',
        'host': host,
        'port': port,
        'reload': reload,
        'reload_excludes': reload_excludes,
        'log_config': {
            'version': 1,
            'formatters': {
                'default': {
                    '()': 'uvicorn.logging.DefaultFormatter',
                    'fmt': '%(asctime)s - %(levelname)s - %(message)s',
                }
            },
            'handlers': {
                'console': {'class': 'logging.StreamHandler', 'formatter': 'default'},
                'file': {
                    'class': 'logging.FileHandler',
                    'filename': 'logs/server.log',
                    'formatter': 'default',
                },
            },
            'root': {'handlers': ['console', 'file'], 'level': 'INFO'},
        },
    }

    # 启动服务器
    try:
        uvicorn.run(**uvicorn_args)
    except Exception as e:
        print(f'🔥 Failed to start server: {str(e)}')
        sys.exit(1)


if __name__ == '__main__':
    main()
